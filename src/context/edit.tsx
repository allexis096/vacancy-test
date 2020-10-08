import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface UsersProps {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
  };
}

interface EditContextProps {
  update: UsersProps[];
  setUpdate: Dispatch<SetStateAction<any>>;
}

const EditContext = createContext<EditContextProps>({} as EditContextProps);

export const EditContextProvider: React.FC = ({ children }) => {
  const [update, setUpdate] = useState([]);

  return (
    <EditContext.Provider value={{ update, setUpdate }}>
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;
