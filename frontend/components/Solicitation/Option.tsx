import { useParams } from 'react-router-dom'

// const routes = ['relatorio', 'solicitacao', 'macrocelula']
const routes = [
  { id: 'relatorio', element: <div>relatorio</div> },
  { id: 'solicitacao', element: <div>solicitacao</div> },
  { id: 'macrocelula', element: <div>macrocelula</div> },
]

export interface OptionProps {
  isAllowed: boolean
  redirectPath?: string
  children?: JSX.Element | JSX.Element[]
}

export const Option = () => {
  const params = useParams()
  console.log('params', params)

  const element = routes.find((route) => route.id === params.id)

  if (!element) return 'hm....'

  return (
    <div>
      <h2>OPTION {params.id}</h2>

      {element}
    </div>
  )
}
