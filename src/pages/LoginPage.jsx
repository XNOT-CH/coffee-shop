import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabaseClient'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  // กดเข้าสู่ระบบ → ส่งอีเมล + รหัสไปเช็กที่ Supabase
  const handleLogin = async (e) => {
    e.preventDefault() // กันฟอร์มรีโหลดหน้าเว็บ

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      return
    }

    // ล็อกอินสำเร็จ → ไปหน้าพนักงาน
    navigate('/staff')
  }

  // ← เพิ่ม: กดปุ่ม Google → เลือกบัญชี Google → ล็อกอินเสร็จกลับมาที่หน้าพนักงาน
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/staff`,
        // ← เพิ่มใหม่: ให้ Google ขึ้นหน้าเลือกบัญชีทุกครั้ง
        queryParams: {
          prompt: 'select_account',
        },
      },
    })

    if (error) {
      setErrorMsg('เข้าสู่ระบบด้วย Google ไม่สำเร็จ')
    }
  }

  return (
    <div className="login-page">
      <h2>สำหรับพนักงาน</h2>
      <p>เข้าสู่ระบบเพื่อจัดการออเดอร์</p>

      {/* ← เพิ่ม: ปุ่มล็อกอินด้วย Google */}
      <button type="button" className="google-btn" onClick={handleGoogleLogin}>
        เข้าสู่ระบบด้วย Google
      </button>

      <form onSubmit={handleLogin}>
        <label>
          อีเมล
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          รหัสผ่าน
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {errorMsg && <p className="login-error">{errorMsg}</p>}

        <button type="submit">เข้าสู่ระบบ</button>
      </form>
    </div>
  )
}

export default LoginPage