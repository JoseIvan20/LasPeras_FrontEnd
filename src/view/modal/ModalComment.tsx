// Modal de comentario
import { Controller, useForm } from "react-hook-form"
import { CommentBody } from "../../types/price"
import { useComment } from "../../hooks/useComment"
import { useEffect } from "react"
import MessageToasty from "../../components/messages/MessageToasty"
import { Save, User2, UserCog2Icon, XCircle } from "lucide-react"
import StarRating from "../../components/button/StartRating"
import CustomButton from "../../components/button/CustomButton"

interface ModalCommentProps {
  onClose: () => void
}

const ModalComment = ({ onClose }: ModalCommentProps) => {

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<CommentBody>()

  const {
    addComment,
    isPendingComment,
    isSuccessComment
  } = useComment()

  // Funcion que crea el comentario
  const onSubmiCreateComment = async (data: CommentBody) => {
    try {
      const dataComment = {
        name: data.name,
        role: data.role,
        content: data.content,
        rating: data.rating
      }
      await addComment(dataComment)
    } catch (error) {
      console.error('Ocurrio un error en el formulario')
    }
  }

  useEffect(() => {
    if (isSuccessComment && !isPendingComment) {
      onClose()
    }
  }, [isSuccessComment, isPendingComment, onClose])

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      <form onSubmit={handleSubmit(onSubmiCreateComment)}>
        <div className="w-full">

          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Coloca un nombre'
            }}
            render={({ field }) => (
              <MessageToasty
                label="Nombre"
                placeholder="John Doe"
                icon={User2}
                error={errors.name?.message}
                {...field}
              />
            )}
          />
        
          <Controller
            name="role"
            control={control}
            rules={{
              required: 'Coloca un rol'
            }}
            render={({ field }) => (
              <MessageToasty
                label="Rol"
                placeholder="Gerente del evento"
                icon={UserCog2Icon}
                error={errors.role?.message}
                {...field}
              />
            )}
          />
        
          <Controller
            name="content"
            control={control}
            rules={{
              required: 'Coloca un mensaje'
            }}
            render={({ field }) => (
              <MessageToasty
                label="Mensaje"
                type="textarea"
                icon={UserCog2Icon}
                error={errors.content?.message}
                {...field}
              />
            )}
          />

          <div>
            {errors.rating && <p className="flex items-center text-red-700 text-sm mt-1 bg-red-100 font-semibold rounded-md p-2 mb-2 gap-2">{errors.rating.message}</p>}
            <label className="text-sm font-medium text-gray-700"> Clasificación </label>
            <Controller
              name="rating"
              control={control}
              rules={{ required: 'Por favor, selecciona una clasificación' }}
              render={({ field }) => (
                <StarRating
                  key={field.value}
                  rating={field.value}
                  onRating={rating => setValue('rating', rating)} />
              )} />
          </div>

        </div>

        <hr className="my-5" />
        
        <div className="flex justify-end gap-3">
          <CustomButton
            buttonText="Cancelar"
            icon={XCircle}
            type="button"
            onClick={onClose} />

          <CustomButton
            buttonText="Guardar"
            icon={Save}
            type="submit"
            isLoading={isPendingComment}
            disabled={isPendingComment}
            loadingText="Guardando..."
            className="bg-[#444] text-white hover:bg-[#666]" />
        </div>
      </form>
    </div>
  )
}

export default ModalComment