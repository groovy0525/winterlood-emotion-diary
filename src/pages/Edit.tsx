import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DiaryStateContext } from "../App"
import DiaryEditor from "../components/DiaryEditor"
import { DiaryState } from "../types"

function Edit() {
  const navigate = useNavigate()
  const { id } = useParams()

  const diaryList = useContext(DiaryStateContext)

  const [originData, setOriginData] = useState<DiaryState>()

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((diary) => diary.id === parseInt(id!))

      if (targetDiary) {
        setOriginData(targetDiary)
      } else {
        alert("없는 일기입니다.")
        navigate("/", { replace: true })
      }
    }
  }, [diaryList, id, navigate])

  return (
    <div>{originData && <DiaryEditor isEdit originData={originData} />}</div>
  )
}

export default Edit
