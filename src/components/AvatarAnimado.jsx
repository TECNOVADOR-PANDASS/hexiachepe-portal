import Lottie from 'lottie-react';

export default function AvatarAnimado({ entidad, src }) {
  return (
    <div>
      <Lottie animationData={require(`../../public/${src}`)} loop={true} style={{ width: 200, height: 200, borderRadius: '50%' }} />
      <p style={{ marginTop: 10 }}>{entidad === 'hexia' ? '🌙 Hexia' : '🛠️ Tío Chepe'}</p>
    </div>
  );
}
