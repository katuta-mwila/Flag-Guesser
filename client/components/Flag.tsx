interface Props{
  code: string
  width: string
}

export default function Flag(props: Props){
  return (<div className="flag">
      <img src={'/images/' + props.code.toLowerCase() + '.png'} width={props.width} alt={'Country Flag (' + props.code + ')'}/>
    </div>)
}