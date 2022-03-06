import renameNaipe from './renameNaipe'
import Table from 'cli-table'
import { greenBright as success, blueBright as info, redBright as error } from 'chalk'

function rename() {
    const renamedFiles = [
        ...renameNaipe('Sopranos'),
        ...renameNaipe('Mezzo-Sopranos'),
        ...renameNaipe('Contraltos'),
        ...renameNaipe('Tenores'),
        ...renameNaipe('Barítonos'),
        ...renameNaipe('Baixos')
    ]
    let renamedFilesSuccess = 0
    let renamedFilesIgnore = 0
    let renamedFilesExists = 0
    let renamedFilesError = 0

    renamedFiles.map(file => {
        if (file.renamed) {
            renamedFilesSuccess += 1
        } else {
            if (file.ignore) {
                renamedFilesIgnore += 1
            } else if (file.exists) {
                renamedFilesExists += 1
            } else if (file.error) {
                renamedFilesError += 1
            }
        }
    })

    const tableRenamedFiles = new Table({
        head: [success('Arquivo'), success('Renomeado')]
    })
    const tableResult = new Table({
        head: [info('Estatística'), info('Resultado')]
    })

    renamedFiles.map(file => 
        tableRenamedFiles.push([
            info(file.path),
            file.renamed ? success('Arquivo renomeado') : file.ignore ? info('Arquivo ignorado') : error('Arquivo não renomeado')
        ])
    )

    tableResult.push([success('Total de arquivo renomeados'), success(renamedFilesSuccess)])
    tableResult.push([info('Total de arquivos ignorados'), info(renamedFilesIgnore)])
    tableResult.push([info('Total de arquivos que já estavam renomeados'), info(renamedFilesExists)])
    tableResult.push([error('Total de erros ao renomear os arquivos'), error(renamedFilesError)])

    console.log(tableRenamedFiles.toString())
    console.log(tableResult.toString())
    console.log(success('Processo terminado'))
}

export default rename