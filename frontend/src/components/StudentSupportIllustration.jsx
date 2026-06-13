import studentSupportImg from '../assets/images/student-support-illustration.png'

export default function StudentSupportIllustration({ className = '' }) {
  return (
    <div
      className={`relative size-full overflow-hidden rounded-2xl ${className}`}
      data-node-id="1:71"
      data-name="Student support illustration"
    >
      <img
        src={studentSupportImg}
        alt="Ilustração de estudantes caminhando em ambiente universitário"
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  )
}
