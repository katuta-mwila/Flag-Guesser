interface Props{
  code: string
  width: string
}

export default function Flag(props: Props){
  return (<div className="flag">
      <img src="" width={props.width} alt={'Country Flag (' + props.code + ')'}/>
    </div>)
}