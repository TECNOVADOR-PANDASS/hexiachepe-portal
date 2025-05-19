import Lottie from 'lottie-react';
import hexiaData from '../../../public/hexia.json';
import chepeData from '../../../public/chepe.json';

export default function AvatarAnimado({ entidad }) {
  const data = entidad === 'hexia' ? hexiaData : chepeData;
  return (
    <div>
      <Lottie animationData={data} loop={true} style={{ width: 200, height: 200, borderRadius: '50%' }} />
      <p style={{ marginTop: 10 }}>{entidad === 'hexia' ? '🌙 Hexia' : '🛠️ Tío Chepe'}</p>
    </div>
  );
}
