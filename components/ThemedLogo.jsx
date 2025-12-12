import { Image, useColorScheme } from 'react-native'

// images
import DarkLogo from '..\\assets\\AFFLECK-BATMAN-PHOTO.jpg'
import LightLogo from '../assets/Squidward.png'

const ThemedLogo = () => {
  const colorScheme = useColorScheme()
  
  const logo = colorScheme === 'dark' ? DarkLogo : LightLogo

  return (
    <Image 
      source={logo}
      style={{
        width: 180,
        height: 180,
        resizeMode: "contain",
        marginBottom: 20
      }}
    />
  )
}

export default ThemedLogo
