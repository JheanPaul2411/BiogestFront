
import { Card } from 'flowbite-react';

interface Props{
  titulo:string,
  descripcion:string,
  imagen:string,
}
export function CardOferta({titulo,descripcion, imagen}:Props) {
  return (
    <Card className="max-w-sm" imgSrc={imagen}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {titulo}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {descripcion}
      </p>
    </Card>
  );
}
