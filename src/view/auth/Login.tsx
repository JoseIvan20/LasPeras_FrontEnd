import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { LoginBody } from "../../types/login"
import MessageToasty from "../../components/messages/MessageToasty"
import { GlobeLock, LockIcon, MailOpen, UserCircle2 } from "lucide-react"
import CustomButton from "../../components/button/CustomButton"
import { Link, NavLink } from "react-router-dom"

const Login = () => {

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginBody>()

  const onSubmitLogin: SubmitHandler<LoginBody> = data => {
    console.log('Data al back', data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3">
      <div className="w-full max-w-xl md:w-1/2 bg-white py-14 px-8 rounded-xl shadow-md">

        <div className="flex items-center gap-3 justify-center mb-10">
          <NavLink to={'/'}>
            <img src="https://res.cloudinary.com/dgphzdi4e/image/upload/contact_images/yavwqfubik47qtv4w6po.png" alt="Las peras en Login" className="w-20 h-20" />
          </NavLink>

          <span className="text-2xl font-semibold text-gray-600">Las Peras</span>
        </div>

        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <div className="mb-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-[#444] text-start mb-2">
              <UserCircle2 />
              Inicia sesión,
            </h2>
            <p className="font-semibold text-gray-500">
              Para que puedas acceder al panel de control y administrar los usuarios
            </p>
          </div>
          <div>
            <Controller
              name="consumidor"
              control={control}
              rules={{
                required: 'Coloca un correo electronico'
              }}
              render={({ field }) => (
                <MessageToasty
                  label="Correo electrónico"
                  type="email"
                  placeholder="example@gmail.com"
                  icon={MailOpen}
                  error={errors.consumidor?.message}
                  {...field}
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="checkPoint"
              control={control}
              rules={{
                required: 'La contraseña no puede ir vacía',
                pattern: {
                  value: /^(?!.*(?:123|abc|def))(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{8,}$/,
                  message: "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número, un carácter especial y no contener secuencias como 123, abc o def"
                }
              }}
              render={({ field }) => (
                <MessageToasty
                  label="Contraseña"
                  type="password"
                  placeholder="********"
                  icon={LockIcon}
                  error={errors.checkPoint?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className='mb-3 flex justify-end'>
            <Link
              to='#'
              className='text-sm text-gray-500 font-medium hover:text-gray-600 duration-300'>
              ¿Olvidaste contraseña?
            </Link>
          </div>

          <div className="flex justify-center pt-10">
            <CustomButton
              buttonText="Iniciar sesión"
              icon={GlobeLock}
              type="submit"
              className="flex justify-center w-full bg-[#444] text-white hover:bg-[#666]" />
          </div>
        </form>
      </div>
    </div>
  )

}

export default Login