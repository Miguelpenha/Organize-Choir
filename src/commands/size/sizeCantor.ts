import path from 'path'
import fs from 'fs'

function sizeCantor(caminho: string, cantor: string) {
    const caminhoCantor = path.resolve(caminho, cantor)
    let size = 0

    if (fs.statSync(caminhoCantor).isDirectory() && !cantor.includes(process.env.IGNORE_FILE)) {
        const caminhoVídeos = path.resolve(caminhoCantor, 'Vídeos')
        const caminhoÁudios = path.resolve(caminhoCantor, 'Áudios')
        const vídeos = fs.readdirSync(caminhoVídeos)
        const áudios = fs.readdirSync(caminhoÁudios)

        vídeos.map(vídeo => 
            size += fs.statSync(
                path.resolve(caminhoVídeos, vídeo)
            ).size
        )
        
        áudios.map(áudio => 
            size += fs.statSync(
                path.resolve(caminhoÁudios, áudio)
            ).size
        )

        return size/1024/1024
    } else {
        return 0
    }
}

export default sizeCantor