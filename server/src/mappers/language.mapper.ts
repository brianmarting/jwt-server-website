import { LanguageDto } from '../dto/language.dto';
import { Language } from '../entity/language';

export class LanguageMapper {

    static toDtoListWithoutDescription(languages: Language[]): LanguageDto[] {
        if (!languages) {
            return [];
        }

        return languages.map(this.toDtoWithoutDescription);
    }

    static toDtoWithoutDescription(language: Language): LanguageDto {
        return {
            id: language.externalId,
            name: language.name,
            summary: language.summary
        } as LanguageDto;
    }

    static toDto(language: Language): LanguageDto {
        return {
            id: language.externalId,
            name: language.name,
            summary: language.summary,
            description: language.description
        } as LanguageDto;
    }
}
