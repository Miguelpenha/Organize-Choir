import { Icantor } from './types'
import path from 'path'
import fs from 'fs'

function listCantores(naipe: string): Icantor[] {
    try {
        const caminho: string = path.resolve(process.env.PROJECT_PATH, naipe)
        const cantoresNames: string[] = fs.readdirSync(caminho)
        const cantores: Icantor[] = []
        cantoresNames.map((name: string) => {
            const caminhoCantor: string = path.resolve(caminho, name)

            if (fs.statSync(caminhoCantor).isDirectory() && !name.includes(process.env.IGNORE_FILE)) {
                const caminhoVídeos = path.resolve(caminhoCantor, 'Vídeos')
                const vídeos: string[] = fs.readdirSync(caminhoVídeos)
                let vídeosCont = 0
                const caminhoÁudios = path.resolve(caminhoCantor, 'Áudios')
                const áudios: string[] = fs.readdirSync(caminhoÁudios)
                let áudiosCont = 0

                vídeos.map(vídeo => {
                    if (fs.statSync(path.resolve(caminhoVídeos, vídeo)).isFile()) {
                        vídeosCont++
                    }
                })

                áudios.map(áudio => {
                    if (fs.statSync(path.resolve(caminhoÁudios, áudio)).isFile()) {
                        áudiosCont++
                    }
                })
                
                cantores.push({
                    name,
                    naipe,
                    vídeo: vídeosCont > 0 ? true : false,
                    áudio: áudiosCont > 0 ? true : false
                })
            } else {
                return []
            }
        })

        return cantores
    } catch {
        return []
    }
}

export default listCantores