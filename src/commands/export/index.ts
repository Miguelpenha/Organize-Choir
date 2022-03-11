import exportNaipe from './exportNaipe'
import fs from 'fs'
import path from 'path'
import { greenBright as success, redBright as error } from 'chalk'
import { Icantores } from './types'

function exportJson(caminhoJson: string) {
    if (caminhoJson) {
        const cantores: Icantores = {
            sopranos: exportNaipe('Sopranos'),
            mezzoSopranos: exportNaipe('Mezzo sopranos'),
            contraltos: exportNaipe('Contraltos'),
            tenores: exportNaipe('Tenores'),
            barítonos: exportNaipe('Barítonos'),
            baixos: exportNaipe('Baixos')
        }

        fs.writeFileSync(
            path.resolve(caminhoJson, 'cantores.json'),
            JSON.stringify(cantores, null, '    ')
        )

        console.log(success('Exportação feita com sucesso!'))
        console.log(success('Processo terminado'))
    } else {
        console.log(error('Caminho do json dos cantores faltando'))
    }
}

export default exportJson