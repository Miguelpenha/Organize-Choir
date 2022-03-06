import { IjsonCantores, IcreatedFolders } from './types'
import fs from 'fs'
import createFolders from './createFolders'
import Table from 'cli-table'
import { greenBright as success, redBright as error, blueBright as info } from 'chalk'

function mkdir(pathJsonCantores: string) {
    if (pathJsonCantores) {
        const jsonCantores: IjsonCantores = JSON.parse(fs.readFileSync(pathJsonCantores).toString('utf-8'))
        const createdFolders: IcreatedFolders[] = [
            ...createFolders('Sopranos', jsonCantores.sopranos || null),
            ...createFolders('Mezzo-Sopranos', jsonCantores.mezzoSopranos || null),
            ...createFolders('Contraltos', jsonCantores.contraltos || null),
            ...createFolders('Tenores', jsonCantores.tenores || null),
            ...createFolders('Barítonos', jsonCantores.barítonos || null),
            ...createFolders('Baixos', jsonCantores.baixos || null)
        ]
        let createdFoldersCreated: number = 0
        let createdFoldersNotCreated: number = 0
        createdFolders.map(folder =>
            folder.created ? createdFoldersCreated += 1 : createdFoldersNotCreated += 1
        )
        const tableCreatedFolders = new Table({
            head: [ success('Pasta'), success('Status') ]
        })
        const tableResult = new Table({
            head: [ info('Estatística'), info('Resultado') ]
        })

        createdFolders.map(folder => 
            tableCreatedFolders.push([
                info(folder.path),
                folder.created ? success('Criada') : error('Não criada')
            ])
        )

        tableResult.push([ success('Total de pastas criadas'), success(createdFoldersCreated) ])
        tableResult.push([ error('Total de pastas não criadas'), error(createdFoldersNotCreated) ])
        
        console.log(tableCreatedFolders.toString())
        console.log(tableResult.toString())
        console.log(success('Processo terminado'))
    } else {
        console.log(error('Json dos cantores faltando'))
    }
}

export default mkdir