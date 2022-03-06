import { Icantor } from './types'
import listCantores from './listCantores'
import Table from 'cli-table'
import { blueBright as info, greenBright as success, redBright as error } from 'chalk'
import path from 'path'
import fs from 'fs'
import makeMd from './makeMd'
import makeDocx from './makeDocx'

export default async function list() {
    const cantores: Icantor[] = [
        ...listCantores('Sopranos'),
        ...listCantores('Mezzo-Sopranos'),
        ...listCantores('Contraltos'),
        ...listCantores('Tenores'),
        ...listCantores('Barítonos'),
        ...listCantores('Baixos')
    ]
    let totalCantoresVídeos: number = 0
    let totalCantoresNotVídeos: number = 0
    let totalCantoresÁudios: number = 0
    let totalCantoresNotÁudios: number = 0
    let totalCantoresNotSend: string[] = []
    let totalCantoresSend: string[] = []
    
    const table = new Table({
        head: [ success('Cantor'), info('Vídeo'), info('Áudio') ]
    })
    const tableResult = new Table({
        head: [ info('Estatística'), info('Resultado') ]
    })

    cantores.map(cantor => {
        table.push([
            info(cantor.name),
            cantor.vídeo ? success('Tem vídeo') : error('Vídeo faltando'),
            cantor.áudio ? success('Tem áudio') : error('Áudio faltando')
        ])
    })

    cantores.map(cantor => {
        if (cantor.vídeo) {
            totalCantoresVídeos += 1
            !totalCantoresSend.includes(cantor.name) && totalCantoresSend.push(cantor.name)
        } else {
            totalCantoresNotVídeos += 1
            !totalCantoresNotSend.includes(cantor.name) && totalCantoresNotSend.push(cantor.name)
        }

        if (cantor.áudio) {
            totalCantoresÁudios += 1
            !totalCantoresSend.includes(cantor.name) && totalCantoresSend.push(cantor.name)
        } else {
            totalCantoresNotÁudios += 1
            !totalCantoresNotSend.includes(cantor.name) && totalCantoresNotSend.push(cantor.name)
        }
    })

    tableResult.push([ success('Total de cantores que enviaram vídeos'), success(totalCantoresVídeos) ])
    tableResult.push([ success('Total de cantores que enviaram áudios'), success(totalCantoresÁudios) ])
    tableResult.push([ error('Total de cantores que não enviaram vídeos'), error(totalCantoresNotVídeos) ])
    tableResult.push([ error('Total de cantores que não enviaram áudios'), error(totalCantoresNotÁudios) ])

    console.log(table.toString())
    console.log(tableResult.toString())

    const caminho = path.resolve(process.env.PROJECT_PATH, 'Lista de cantores')

    !fs.existsSync(caminho) && fs.mkdirSync(caminho)
    
    makeMd(cantores, caminho, totalCantoresSend.length, totalCantoresNotSend.length)
    await makeDocx(cantores, caminho, totalCantoresSend.length, totalCantoresNotSend.length)

    console.log(success('Processo terminado'))
}