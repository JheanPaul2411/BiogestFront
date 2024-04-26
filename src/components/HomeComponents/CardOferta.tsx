import { Card } from 'flowbite-react';

interface Props {
  titulo: string;
  descripcion: string;
  imagen: string;
  ariaLabel: string; // Nuevo prop para la etiqueta aria-label
}

export function CardOferta({ titulo, descripcion, imagen, ariaLabel }: Props) {
  return (
    <Card
      className="max-w-sm"
      imgSrc={imagen}
      aria-label={ariaLabel} // Etiqueta aria-label para el componente
    >
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {titulo}
      </h2>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {descripcion}
      </p>
    </Card>
  );
}