package backend.Model.Mapper;


import backend.Model.Dto.Record.acolhimentoRecord;
import backend.Model.Dto.acolhimentoDto;
import backend.Model.acolhimento;
import backend.Repository.Entity.acolhimentoEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper (componentModel = "spring")
public interface acolhimentoMapper {
    acolhimento toModel(acolhimentoRecord acolhimentoRecord);

    @Mapping(target = "id", ignore = true)
    acolhimentoEntity toEntity(acolhimento acolhimentoModel);
    acolhimentoDto toDto(acolhimento acolhimentoEntity);
}
