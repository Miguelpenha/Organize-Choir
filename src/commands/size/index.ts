import sizeNaipe from './sizeNaipe'
import Table from 'cli-table'
import { greenBright as success, blueBright as info, cyanBright as info2 } from 'chalk'

function size() {
    const sizeSopranos = sizeNaipe('Sopranos') | 0
    const sizeMezzoSopranos = sizeNaipe('Mezzo sopranos') | 0
    const sizeContraltos = sizeNaipe('Contraltos') | 0
    const sizeTenores = sizeNaipe('Tenores') | 0
    const sizeBarítonos = sizeNaipe('Barítonos') | 0
    const sizeBaixos = sizeNaipe('Baixos') | 0
    const size = (sizeSopranos+sizeMezzoSopranos+sizeContraltos+sizeTenores+sizeBarítonos+sizeBaixos).toFixed(2)
    const table = new Table({
        head: [success('Tamanho'), success('naipe')]
    })

    table.push([info(sizeSopranos.toFixed(2)), info2('Sopranos')])
    table.push([info(sizeMezzoSopranos.toFixed(2)), info2('Mezzo sopranos')])
    table.push([info(sizeContraltos.toFixed(2)), info2('Contraltos')])
    table.push([info(sizeTenores.toFixed(2)), info2('Tenores')])
    table.push([info(sizeBarítonos.toFixed(2)), info2('Barítonos')])
    table.push([info(sizeBaixos.toFixed(2)), info2('Baixos')])
    table.push([info(size), info('Tamanho total do coro')])
    
    console.log(table.toString())
    console.log(info2(`${info(size)} MB no total de todas as pastas`))
}

export default size