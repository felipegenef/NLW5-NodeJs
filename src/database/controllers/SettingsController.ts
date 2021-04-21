import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../../repositories/settingsRepository';
class SettingsController {
    async create(request: Request, response: Response) {
        const { userName, chat } = request.body;

        const settingsRepository = getCustomRepository(SettingsRepository);

        const setting = settingsRepository.create({ chat, userName });

        await settingsRepository.save(setting);

        response.json(setting)
    }
}
export { SettingsController }