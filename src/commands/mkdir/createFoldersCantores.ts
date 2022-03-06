import { IcreatedFolders } from './types'
import path from 'path'
import fs from 'fs'

function createFoldersCantores(cantores: string[], naipe: string): IcreatedFolders[] {
    try {
        const createdFolders: IcreatedFolders[] = []

        cantores.map(cantor => {
            const caminhoCantor = path.resolve(process.env.PROJECT_PATH, naipe, cantor)
            const caminhoÁudios = path.resolve(caminhoCantor, 'Áudios')
            const caminhoVídeos = path.resolve(caminhoCantor, 'Vídeos')

            try {
                fs.mkdirSync(caminhoCantor)

                createdFolders.push({
                    path: caminhoCantor,
                    created: true
                })
            } catch {
                createdFolders.push({
                    path: caminhoCantor,
                    created: false
                })
            }

            try {
                fs.mkdirSync(caminhoÁudios)

                createdFolders.push({
                    path: caminhoÁudios,
                    created: true
                })
            } catch {
                createdFolders.push({
                    path: caminhoÁudios,
                    created: false
                })
            }
            
            try {
                fs.mkdirSync(caminhoVídeos)

                createdFolders.push({
                    path: caminhoVídeos,
                    created: true
                })
            } catch {
                createdFolders.push({
                    path: caminhoVídeos,
                    created: false
                })
            }
        })

        return createdFolders
    } catch {
        return []
    }
}

export default createFoldersCantores