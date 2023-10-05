import express from 'express'
import mongoose from 'mongoose'
import { config } from './config/mongo-config.js'
import { MarkersModel } from './models/markers.js'

const app = express()

app.use(express.json())

app.get('/location', async (req, res) => {
    try {
        await mongoose.connect(config.mongoCon)
        const markers = await MarkersModel.find()
        res.status(200).json(markers)
    } catch (error) {
        res.json({ erro: error })
    }
})

app.get('/location/:id', async (req, res) => {
    const id = req.params.id
    try {
        await mongoose.connect(config.mongoCon)
        const marker = await MarkersModel.findOne({ _id: id })
        if (!marker) {
            res.status(422).json({ message: 'Localização não encontrada!' })
            return
        }
        res.json(marker)
    } catch (error) {
        res.json({ erro: error })
    }
})

app.post('/newlocation', async (req, res) => {
    const { name, location } = req.body
    const marker = {
        name,
        location
    }
    try {
        await mongoose.connect(config.mongoCon)
        const data = await MarkersModel.create(marker)
        res.json({ message: 'Localização inserida com sucesso!', data })
    } catch (error) {
        res.json({ erro: error })
    }
})

app.patch('/updatelocation/:id', async (req, res) => {
    const id = req.params.id
    const { name, location } = req.body
    const marker = {
        name,
        location
    }
    try {
        await mongoose.connect(config.mongoCon)
        const updatedMarker = await MarkersModel.updateOne({ _id: id }, marker)
        if (updatedMarker.matchedCount === 0) {
            res.status(422).json({ message: 'Localização não encontrada!' })
            return
        }
        res.status(200).json(marker)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.delete('/deletelocation/:id', async (req, res) => {
    const id = req.params.id
    await mongoose.connect(config.mongoCon)
    const marker = await MarkersModel.findOne({ _id: id })
    if (!marker) {
        res.status(422).json({ message: 'Localização não encontrada!' })
        return
    }
    try {
        await MarkersModel.deleteOne({ _id: id })
        res.status(200).json({ message: 'Localização removida com sucesso!' })
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

app.listen(3333, console.log('Server runnig in http://localhost:3333.'))