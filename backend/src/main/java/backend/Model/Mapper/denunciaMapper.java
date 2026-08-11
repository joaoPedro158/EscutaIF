package backend.Model.Mapper;

import backend.Model.Dto.Record.denunciaRecord;
import backend.Model.Dto.denunciaDto;
import backend.Model.denuncia;
import backend.Repository.Entity.denunciaEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface denunciaMapper {
    denuncia toModel(denunciaRecord denunciaRecord);
    denunciaEntity toEntity(denuncia denunciaModel);
    denunciaDto toDto(denuncia denunciaModel);
    denunciaDto toDto(denunciaEntity entity);

    denuncia toModel(denunciaEntity denuncia);
}