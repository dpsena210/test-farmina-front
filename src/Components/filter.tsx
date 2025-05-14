import Select, { ActionMeta, SingleValue } from 'react-select';
import { useState, useEffect } from 'react';
import { Table,TableBody, TableCell,TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface SpecialCare {
  value: string;
  label: string;
}

interface ProductType {
  country: string | null;
  type: string | null;
  gestation: string | null;
  lactation: string | null;
  productType: string | null;
  specialcares: string | null;
  lifeStage : string | null;
}

interface SelectOption {
  value: string;
  label: string;
}
const columnHeaders: Record<string, string> = {
  id:"ID",
  type: 'Pet',
  name:'nome',
  productType: 'Alimentação',

  gestation: 'Gestante',
  lactation: 'Lactante',
    lifeStages: 'Fase da vida',

  specialcares: 'Cuidado Especial',
};
const columnsHeadersSequence = Object.keys(columnHeaders); // Ordem controlada


export default function Filter() {
  const [product, setProduct] = useState<ProductType>({
    country:'IT',
    type: null,
    gestation: null,
    lactation: null,
    productType: null,
    specialcares: null,
    lifeStage: null
  });

  const [nameOptions, setNameOptions] = useState<string | null>(null);
  const [productTypeValue, setProductTypeValue] = useState<string | null>(null);
  const [petType, setPetType] = useState<string | null>(null);
  const [gestationVar, setGestationVar] = useState<string | null>(null);
  const [lactationVar, setLactationVar] = useState<string | null>(null);
  const [lifeStageValue, setLifeStageValue] = useState<string | null>(null);
  const [specialCare, setSpecialCare] = useState<string | null>(null);
  const [ specialCareOptions , setSpecialCareOptions] = useState<SpecialCare[]>([]);
 
  const [filteredData, setFilteredData]  =  useState<any>([]);
  const [columns, setColumns] = useState<string[]>(columnsHeadersSequence);

  const productTypeOptions = [
  { value: 'dry', label: 'Dry' },
  { value: 'wet', label: 'Wet' }
    ];
const petTypeOptions = [
  { value: 'dog', label: 'Dog' },
  { value: 'cat', label: 'Cat' },
  
    ];

    const gestationOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  
    ];
     const lactationOptions = [
  { value: 'true', label: 'Sim' },
  { value: 'false', label: 'Não' },
  
    ];
     const lifeStageOptions = [
    { value: 'puppy', label: 'Filhote' },
    { value: 'adult', label: 'Adulto' },
    { value: 'senior', label: 'Senior' }
  
    ];
    

  
  // Carrega opções ao montar o componente
  useEffect(() => {

    fetch('https://www.webstock.com.br/api/products',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        }
        ,
        body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        setFilteredData(data.products_filtered);
        setColumns(Object.keys(data.products_filtered[0]));
      });
      fetch('https://www.webstock.com.br/api/special',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        }
        ,
        body: JSON.stringify(product)
    })
      .then(res => res.json())
        .then((data) => {
            if (Array.isArray(data.special_filtered)) {
                const options = data.special_filtered.map((care: any) => ({
                value: care.specialcare_id,
                label: care.specialcare_name
                }));
                setSpecialCareOptions(options);
            } else {
                console.error("Resposta inesperada:", data);
            }
            });
    
  }, [productTypeValue,petType, gestationVar, lactationVar,specialCare,lifeStageValue]);


  const handleChangeProductType = (selectedOption: any) => {
    setProduct({
        country:'IT',
        type: petType,
        gestation: gestationVar,
        lactation: lactationVar,
        productType: selectedOption ? selectedOption.value : null,
        specialcares: specialCare,
        lifeStage:lifeStageValue
    })
    setProductTypeValue(selectedOption ? selectedOption.value : null);
  };

  const handleChangePetType = (selectedOption: any) => {
    setPetType(selectedOption ? selectedOption.value : null);
     setProduct({
        country:'IT',
        type: selectedOption ? selectedOption.value : null,
        gestation: gestationVar,
        lactation: lactationVar,
        productType: productTypeValue,
        specialcares: specialCare,
        lifeStage:lifeStageValue
    })
  };
  const handleChangeGestation = (selectedOption: any) => {
    setGestationVar(selectedOption ? selectedOption.value : null);
    setProduct({
        country:'IT',
        type: petType,
        gestation: selectedOption ? selectedOption.value : null,
        lactation: lactationVar,
        productType: productTypeValue,
        specialcares: specialCare,
        lifeStage:lifeStageValue
    })
  };
  const handleChangeLactation = (selectedOption: any) => {
    setLactationVar(selectedOption ? selectedOption.value : null);
    setProduct({
        country:'IT',
        type: petType,
        gestation: gestationVar,
        lactation: selectedOption ? selectedOption.value : null,
        productType: productTypeValue,
        specialcares: specialCare,
        lifeStage:lifeStageValue
    })
  };
  const handleChangeLifeStage = (selectedOption: any) => {
    setLifeStageValue(selectedOption ? selectedOption.value : null);
    setProduct({
        country:'IT',
        type: petType,
        gestation: gestationVar,
        lactation: lactationVar,
        productType: productTypeValue,
        specialcares: specialCare,
        lifeStage:selectedOption ? selectedOption.value : null,
    })
  };
  const handleSpecialCare = (selectedOption: any) => {

    setSpecialCare(selectedOption ? selectedOption.value : null);
    setProduct({
        country:'IT',
        type: petType,
        gestation: gestationVar,
        lactation: lactationVar,
        productType: productTypeValue,
        specialcares: selectedOption ? selectedOption.value : null,
        lifeStage:lifeStageValue,
    })
  };
  


 const flattenValue = (value: any): string => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return Object.values(value)
      .map((v) => {
        if (v && typeof v === "object" && "name" in v) {
          return (v as { name: string }).name;
        }
        return String(v);
      })
      .join(", ");
  }
  
  return String(value);
};


  return (
    <div style={{ width: '100%', margin: '0px' }}>
    <div className="all-filters">
        <div className='filter-div'>
            <Select
                value={productTypeOptions.find(opt => opt.value === productTypeValue)}
                onChange={handleChangeProductType}
                options={productTypeOptions}
                isSearchable
                placeholder="Alimentação"
                className='filter'

                noOptionsMessage={() => "Nenhuma opção encontrada"}
                 styles={{
                    placeholder: (base) => ({
                    ...base,
                    color: 'black'
                

                    })
                }}
            />
        </div>
        <div className='filter-div'>
        <Select
            value={petTypeOptions.find(opt => opt.value === productTypeValue)}
            onChange={handleChangePetType}
            options={petTypeOptions}
            className='filter'
            isSearchable
            placeholder="Pet"

            noOptionsMessage={() => "Nenhuma opção encontrada"}
            styles={{
                    placeholder: (base) => ({
                    ...base,
                    color: 'black' ,         
                    })
                }}
        />
        </div>
        <div className='filter-div'>

        <Select
            value={gestationOptions.find(opt => opt.value === gestationVar)}
            onChange={handleChangeGestation}
            options={gestationOptions}
            className='filter'
            isSearchable
            placeholder="Gestante"

            noOptionsMessage={() => "Nenhuma opção encontrada"}
            styles={{
                    placeholder: (base) => ({
                    ...base,
                    color: 'black',
                    })
                }}
        />
        </div >
         <div className='filter-div'>

        <Select
            value={lactationOptions.find(opt => opt.value === lactationVar)}
            onChange={handleChangeLactation}
            options={lactationOptions}
            className='filter'
            isSearchable
            placeholder="Lactante"

            noOptionsMessage={() => "Nenhuma opção encontrada"}
            styles={{
                    placeholder: (base) => ({
                    ...base,
                    color: 'black',
                    })
                }}
        />
        </div>
         <div className='filter-div'>

        <Select
            value={lifeStageOptions.find(opt => opt.value === lifeStageValue)}
            onChange={handleChangeLifeStage}
            options={lifeStageOptions}
            isSearchable
            placeholder="Fase da Vida"
            noOptionsMessage={() => "Nenhuma opção encontrada"}
            className='filter'
            styles={{
                    placeholder: (base) => ({
                    ...base,
                    color: 'black',
                    })
                }}
        />
        </div>
        <div>

        <Select
            value={specialCareOptions.find(opt => opt.value === specialCare)}
            onChange={handleSpecialCare}
            options={specialCareOptions}
            className='filter'
            isSearchable
            placeholder="Cuidado Especial"
            noOptionsMessage={() => "Nenhuma opção encontrada"}
            styles={{
                    placeholder: (base) => ({
                    ...base,
                    color: 'black' ,
                })
                }}
        />
        </div>
    </div>
       <TableContainer component={Paper} sx={{
                        borderRadius: 5,
                        boxShadow: 10,
                        maxHeight: 600,
                        overflow: 'auto',
                        width:'80vw',
                        minWidth:'900px',
                        marginLeft:'auto',
                        marginRight:'auto', 
                        marginBottom:'50px'
                    }}>
      <Table className="table">
        <TableHead>
   <TableRow>
            {columnsHeadersSequence.map(col => ( // ← Ordem fixa
            <TableCell key={col} sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'white', // Azul premium (pode trocar para sua cor)
                    color: 'black',
                    fontSize: '0.875rem',
                    textAlign:'center',
                    letterSpacing: '0.5px', // Espaçamento entre letras
                    borderRight: '1px solid rgba(255, 255, 255, 0.1)', // Divisor sutil
                    '&:last-child': { borderRight: 'none' }, // Remove borda do último item
                    }}>
                {columnHeaders[col]} 
            </TableCell>
            ))}
        </TableRow>
</TableHead>

        <TableBody>
          {filteredData.map((product:any, idx:any) => (
                            <TableRow key={idx} sx={{ 
                            backgroundColor: idx % 2 === 0 ? '#fafafa' : '#ffffff',
                            '&:hover': { backgroundColor: '#f0f0f0' },
                            transition: 'background-color 0.2s ease'
                        }}>
              {columnsHeadersSequence.map((col:any) => (
                <TableCell key={col} sx={{
                    fontSize: '0.875rem',
                    textAlign:'center',
                    maxWidth:'200px'

                }}>
                {flattenValue(product[col])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}