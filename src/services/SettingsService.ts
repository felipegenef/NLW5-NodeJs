import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Settings";
import { SettingsRepository } from "../repositories/settingsRepository";

interface iSettingsCreate {
  chat: boolean;
  userName: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, userName }: iSettingsCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      userName,
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }
    const setting = this.settingsRepository.create({ chat, userName });

    await this.settingsRepository.save(setting);

    return setting;
  }
}
export { SettingsService };
