import { NavLink } from 'react-router-dom'

const SampleSelect = () => {
  return (
    <select name="TODO">
      {/* <option value="">--Please choose an option--</option> */}
      <option value="1">Opção 1</option>
      <option value="2">Opção 2</option>
      <option value="3">Opção 3</option>
    </select>
  )
}

const SampleNumberInput = () => <input type="number" />

export const SolicitationPage = () => {
  const onInclude = () => {
    alert('incluir')
  }

  const onSave = () => {
    alert('save')
  }

  return (
    <div style={{ border: '2px solid red' }}>
      <div>
        <h2>Solicitação UST</h2>
        <NavLink to={-1 as unknown as string}>Voltar</NavLink>
      </div>

      <div>
        <div>
          Mês/Ano <SampleSelect />
        </div>
        <div>
          Coordenação <SampleSelect />
        </div>
        <div>
          Macrocélula <SampleSelect />
        </div>
        <div>
          Célula <SampleSelect />
        </div>
      </div>

      <div>
        <div>
          Atividade <SampleSelect />
        </div>
        <div>
          Descrição Atividade <textarea />
        </div>
      </div>

      <div>
        <div>
          Complexidade <input />
        </div>
        <div>
          Fator de ponderação <SampleNumberInput />
        </div>
        <div>
          Esforço (horas) <SampleNumberInput />
        </div>
      </div>

      <div>
        <div>
          Simultaneidade <SampleNumberInput />
        </div>
        <div>
          Dias úteis <SampleNumberInput />
        </div>
        <div>
          Dias não úteis <SampleNumberInput />
        </div>
      </div>

      <div>
        <button onClick={onInclude}>Incluir</button>
      </div>

      <div>
        <table>
          <tr>
            <th>#</th>
            <th>Mês/Ano</th>
            <th>Coordenação</th>
            <th>Macrocélula</th>
            <th>Célula</th>
            <th>Atividade</th>
            <th>UST</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Jan/2023</td>
            <td>Coord1</td>
            <td>Macroc1</td>
            <td>Célula 1</td>
            <td>Atividade 1</td>
            <td>310</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jan/2023</td>
            <td>Coord2</td>
            <td>Macroc2</td>
            <td>Célula 2</td>
            <td>Atividade 2</td>
            <td>250</td>
          </tr>
        </table>
      </div>

      <div>
        <span>Total UST&apos;s: 560</span>
        <button onClick={onSave}>Salvar</button>
      </div>
    </div>
  )
}
