#!/usr/bin/env node

import dotenv from 'dotenv'
import path from 'path'
dotenv.config({
   path: path.resolve(__dirname, '..', '.env')
})
import mkdir from './commands/mkdir'
import rename from './commands/rename'
import size from './commands/size'
import list from './commands/list'
import exportJson from './commands/export'
import dimensions from './commands/dimensions'
import help from './commands/help'
import { redBright as error } from 'chalk'

switch (process.argv[2]) {
    case 'mkdir':
        mkdir(process.argv[3])

        break
    case 'rename':
        rename()

        break
    case 'size':
        size()
        
        break
    case 'list':
        const pathFolder: string | undefined = process.argv[3] ? process.argv[3].replace('"', '') : undefined
        list(pathFolder).then()
        
        break
    case 'export':
        exportJson(process.argv[3])

        break
    case 'dimensions':
        dimensions()

        break
    case 'help': 
    case '--help':
    case '-h':
    case undefined:
        help()

        break
    default:
        console.log(error('Comando inválido'))
        
        break
}