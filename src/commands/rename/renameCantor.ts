import { IrenamedFiles } from './types'
import path from 'path'
import fs from 'fs'

function renameCantor(caminho: string, cantor: string): IrenamedFiles[] {
    const caminhoCantor = path.resolve(caminho, cantor)

    if(fs.statSync(caminhoCantor).isDirectory() && !cantor.includes(process.env.IGNORE_FILE)) {
        const caminhoVídeos = path.resolve(caminhoCantor, 'Vídeos')
        const caminhoÁudios = path.resolve(caminhoCantor, 'Áudios')
        const vídeos = fs.readdirSync(caminhoVídeos)
        const áudios = fs.readdirSync(caminhoÁudios)
        const renamedFiles: IrenamedFiles[] = []
        
        vídeos.map((vídeo, index) => {
            const nameFile = `${cantor} vídeo (${index+1}).${vídeo.split('.')[vídeo.split('.').length-1]}`
            const caminhoVídeo = path.resolve(caminhoVídeos, nameFile)

            if (fs.statSync(path.resolve(caminhoVídeos, vídeo)).isFile()) {
                if (!vídeo.includes(process.env.IGNORE_FILE)) {
                    if (!fs.existsSync(caminhoVídeo)) {
                        try {
                            fs.renameSync(path.resolve(caminhoVídeos, vídeo), caminhoVídeo)
                            
                            renamedFiles.push({
                                path: caminhoVídeo,
                                renamed: true
                            })
                        } catch {
                            renamedFiles.push({
                                path: caminhoVídeo,
                                renamed: false,
                                error: true
                            })
                        }
                    } else {
                        renamedFiles.push({
                            path: caminhoVídeo,
                            renamed: false,
                            exists: true
                        })
                    }
                } else {
                    renamedFiles.push({
                        path: caminhoVídeo,
                        renamed: false,
                        ignore: true
                    })
                }   
            }
        })

        áudios.map((áudio, index) => {
            const nameFile = `${cantor} áudio (${index+1}).${áudio.split('.')[áudio.split('.').length-1]}`
            const caminhoÁudio = path.resolve(caminhoÁudios, nameFile)

            if (fs.statSync(path.resolve(caminhoÁudios, áudio)).isFile()) {
                if (!áudio.includes(process.env.IGNORE_FILE)) {
                    if (!fs.existsSync(caminhoÁudio)) {
                        try {
                            fs.renameSync(path.resolve(caminhoÁudios, áudio), caminhoÁudio)
    
                            renamedFiles.push({
                                path: caminhoÁudio,
                                renamed: true
                            })
                        } catch {
                            renamedFiles.push({
                                path: caminhoÁudio,
                                renamed: false,
                                error: true
                            })
                        }
                    } else {
                        renamedFiles.push({
                            path: caminhoÁudio,
                            renamed: false,
                            exists: true
                        })
                    }
                } else {
                    renamedFiles.push({
                        path: caminhoÁudio,
                        renamed: false,
                        ignore: true
                    })
                }
            }
        })

        return renamedFiles
    } else {
        return []
    }
}

export default renameCantor