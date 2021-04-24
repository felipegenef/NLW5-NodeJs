import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/settingsRepository';
import { SettingsService } from '../services/SettingsService';
class SettingsController {
    async create(request: Request, response: Response) {
        const { userName, chat } = request.body;

        const settingsService = new SettingsService();

        try {
            const setting = await settingsService.create({ chat, userName });

            response.json(setting)
        } catch (err) {
            return response.status(400).json({ message: err.message })
        }
    }
}
export { SettingsController }