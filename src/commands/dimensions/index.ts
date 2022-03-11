import path from 'path'
import fs from 'fs'
import ffprobe from 'ffprobe'
import ffprobeStatic from 'ffprobe-static'
import { Inaipes } from '../../types'
import naipes from '../../utils/naipes'

async function dimensionsVídeo(caminho: string) {
    const infoVídeo = await ffprobe(caminho, { path: ffprobeStatic.path })

    return {
        widht: infoVídeo.streams[0].width,
        height: infoVídeo.streams[0].height
    }
}

async function dimensionsCantor(caminho: string) {
    const caminhoVídeos = path.resolve(caminho, 'Vídeos')
    const vídeos = fs.readdirSync(caminhoVídeos)
    let vídeosInfo = await Promise.all(
        vídeos.map(async vídeo => {
            const caminhoVídeo = path.resolve(caminhoVídeos, vídeo)

            const info = await dimensionsVídeo(caminhoVídeo)

            return {
                ...info,
                vídeo
            }
        })
    )

    return vídeosInfo.length >= 1 ? vídeosInfo : undefined
}

async function dimensionsNaipe(naipe: Inaipes) {
    try {
        const caminho = path.resolve(process.env.PROJECT_PATH, naipe)
        const cantoresFolders = fs.readdirSync(caminho)
        const cantores = await Promise.all(
            cantoresFolders.map(async cantor => {
                const caminhoCantor = path.resolve(caminho, cantor)
                
                if (fs.statSync(caminhoCantor).isDirectory() && !caminhoCantor.includes(process.env.IGNORE_FILE)) {
                    return await dimensionsCantor(caminhoCantor)
                }
            })
        )

        return cantores.filter(n => n)
    } catch (error) {
        return []
    }
}

async function dimensions() {
    const naipesDimensions = await Promise.all(
        naipes.map(async naipe => await dimensionsNaipe(naipe))
    )

    console.log(naipesDimensions)
}

export default dimensions