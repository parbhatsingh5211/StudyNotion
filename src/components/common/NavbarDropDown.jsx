import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../hooks/useOnClickOutside"
import { logout } from "../../services\/operations/authAPI"

export default function NavbarDropDown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <div className="absolute top-[50px] right-[50px] " onClick={() => setOpen(false)}>
        <div className="text-white">
            HII
        </div>
    </div>
    
  )
}