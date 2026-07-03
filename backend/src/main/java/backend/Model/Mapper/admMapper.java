package backend.Model.Mapper;

import backend.Model.Dto.Record.admRecord;
import backend.Model.Dto.admDto;
import backend.Model.adm;
import backend.Repository.Entity.admEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface admMapper {
    adm toModel(admRecord admRecord);

    admEntity toEntity(adm admModel);

    admDto toDto(adm admModel);
}
