import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import React, { useState } from 'react';
import {Image, TouchableOpacity } from 'react-native';

interface MoodFacesProps {
  mood: string; // Specify the type of the mood prop
}

const MoodFaces: React.FC<MoodFacesProps> = ({ mood }) => {
  let imageSource;

  switch (mood) {
    case 'happy':
      imageSource = require('@/assets/images/happy_face.png');
      break;
    case 'mild':
      imageSource = require('@/assets/images/mild_face.png');
      break;
    case 'sad':
      imageSource = require('@/assets/images/sad_face.png');
      break;
    case 'angry':
      imageSource = require('@/assets/images/angry_face.png');
      break;
    default:
      imageSource = require('@/assets/images/happy_face.png');
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });


  return (
    <View style={styles.moodFacesContainer}>
      <View style={styles.dateTimeContainer}>
        <Text style={styles.dateText}>{formattedDate}th</Text>
        <Text style={styles.timeText}>{formattedTime}</Text>
      </View>
      <Image 
        style={styles.image}
        source={imageSource}
      />
    </View>
  );
};

export default function TabOneScreen() {
  const [mood, setMood] = useState('happy'); // Initial mood

  const handleMoodChange = (direction: 'up' | 'down') => {
    const moods = ['happy', 'mild', 'sad', 'angry'];
    let index = moods.indexOf(mood);
  
    // Define the step based on the direction
    const step = direction === 'up' ? 1 : -1;
  
    // Loop through the moods
    for (let i = 0; i < moods.length; i++) {
      index = (index + step + moods.length) % moods.length; // Ensure index wraps around
      if (moods[index] !== mood) {
        setMood(moods[index]);
        break;
      }
    }
  };

  const handleLogIt = () => {
    // Implement logging or tracking logic here
    console.log('Mood logged:', mood);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Welcome back, </Text>
      <Text style={styles.title}> James</Text>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => handleMoodChange('sad')} style={styles.navigationButton}>
          <Image
            style={styles.navigationImage}
            source={require('@/assets/images/arrow_up.png')}
          />
        </TouchableOpacity>
        <MoodFaces mood={mood} />
        <TouchableOpacity onPress={() => handleMoodChange('angry')} style={styles.navigationButton}>
          <Image
            style={styles.navigationImage}
            source={require('@/assets/images/arrow_down.png')}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleLogIt} style={styles.logItButton}>
        <Text style={styles.logItButtonText}>Log It</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  moodFacesContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  navigationButton: {
    paddingHorizontal: 0,
  },
  navigationImage: {
    width: 30,
    height: 40,
    marginHorizontal: 1,
  },
  logItButton: {
    marginTop: 20,
    backgroundColor: '#393937',
    padding: 5,
    borderRadius: 50,
    minWidth: 100,
    alignItems: 'center',
    height: 25,
  },
  logItButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});