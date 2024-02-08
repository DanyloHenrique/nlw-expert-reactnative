import { Pressable, PressableProps, Text } from 'react-native';
import { clsx } from 'clsx';

//tipagem
type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

//...rest para pegar todas as propriedades no geral
export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
  return (
    //btn e clsx para dar classes de forma condicional
    <Pressable
      className={clsx('bg-slate-800 px-4 justify-center rounded-md h-10', isSelected && "border-2 border-lime-300")}
      {...rest}
    >
      {/* texto de dentro do botao */}
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
}
