import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux";
import { updateName } from "../redux/general";

type SearchProps = {
 placeholder: string
}

export const Search = ({placeholder}: SearchProps) => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  
  const submitName = () => {
    dispatch(updateName(name))
  }

  return (
    <div className="app-search">
      <input onChange={(e: ChangeEvent<HTMLInputElement>) => setName(() => e.target.value)} type="text" placeholder={placeholder} />
      <button onClick={submitName}>Search</button>
    </div>
  )
}