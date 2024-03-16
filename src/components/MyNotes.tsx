import React, {useState} from 'react';
import Block from './Block';
import Text from './Text';
import {
  Button,
  Center,
  Icon,
  ModalBackdrop,
  ModalFooter,
  ModalHeader,
  TextareaInput,
} from '@gluestack-ui/themed';
import {ButtonText} from '@gluestack-ui/themed';
import {ButtonIcon} from '@gluestack-ui/themed';
import {AddIcon} from '@gluestack-ui/themed';
import {useTheme} from '../hooks';
import {ScrollView} from 'react-native-gesture-handler';
import {Modal} from '@gluestack-ui/themed';
import {ModalContent} from '@gluestack-ui/themed';
import {Heading} from '@gluestack-ui/themed';
import {ModalCloseButton} from '@gluestack-ui/themed';
import {CloseIcon} from '@gluestack-ui/themed';
import {ModalBody} from '@gluestack-ui/themed';
import {Textarea} from '@gluestack-ui/themed';
import {Menu} from '@gluestack-ui/themed';
import {MenuItem} from '@gluestack-ui/themed';
import {MenuItemLabel} from '@gluestack-ui/themed';
import {ThreeDotsIcon} from '@gluestack-ui/themed';
import {EditIcon} from '@gluestack-ui/themed';
import {TrashIcon} from '@gluestack-ui/themed';
import {Alert} from 'react-native';

let noteInput = '';

export default function MyNotes() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const {colors, sizes} = useTheme();
  const [showModal, setShowModal] = useState(false);
  const ref = React.useRef(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedNoteContent, setEditedNoteContent] = useState('');

  const [notes, setNotes] = useState([]);

  const handleEditNote = () => {
    const updatedNotes = [...notes];
    updatedNotes[selectedNoteIndex].content = editedNoteContent;
    const currentDate = new Date();
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    updatedNotes[selectedNoteIndex].updatedAt = formattedDate;
    setNotes(updatedNotes);
    setEditModalVisible(false);
  };

  console.log(notes);

  const handleAddNote = (noteText) => {
    const currentDate = new Date();
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    const newNote = {
      content: noteText,
      createdAt: formattedDate,
      updatedAt: formattedDate,
    };
    setNotes([...notes, newNote]);
    setShowModal(false);
  };

  const handleDeleteNote = (index) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedNotes = [...notes];
            updatedNotes.splice(index, 1);
            setNotes(updatedNotes);
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ScrollView>
      <Modal
        size="full"
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Engage with Modals</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Textarea
              size="md"
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}>
              <TextareaInput
                onChangeText={(text) => (noteInput = text)}
                placeholder="Your text goes here..."
              />
            </Textarea>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                handleAddNote(noteInput);
                noteInput = '';
                setShowModal(false);
              }}>
              <ButtonText>Add</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        size="full"
        isOpen={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
        }}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Edit Note</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Textarea
              size="md"
              isReadOnly={false}
              isInvalid={false}
              isDisabled={false}>
              <TextareaInput
                onChangeText={(text) => setEditedNoteContent(text)}
                value={editedNoteContent}
              />
            </Textarea>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setEditModalVisible(false);
              }}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => {
                handleEditNote();
                setEditedNoteContent('');
              }}>
              <ButtonText>Save</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Block padding={sizes.sm} radius={sizes.sm} tertiary marginTop={sizes.sm}>
        <Text gray h5 marginBottom={sizes.s}>
          My Notes
        </Text>

        {notes.map((item, index) => (
          <Block marginVertical={sizes.xs} card key={index}>
            <Text>{item.content}</Text>
            <Block row marginTop={sizes.l}>
              <Block>
                <Text gray>Created at {item.createdAt}</Text>
              </Block>
              <Block align="flex-end">
                <Menu
                  placement="bottom right"
                  trigger={({...triggerProps}) => (
                    <Button variant="link" {...triggerProps}>
                      <ButtonIcon as={ThreeDotsIcon} />
                    </Button>
                  )}>
                  <MenuItem
                    onPress={() => {
                      setEditedNoteContent(item.content);
                      setSelectedNoteIndex(index);
                      setEditModalVisible(true);
                    }}>
                    <Icon as={EditIcon} size="sm" mr="$2" />
                    <MenuItemLabel size="sm">Edit</MenuItemLabel>
                  </MenuItem>
                  <MenuItem onPress={() => handleDeleteNote(index)}>
                    <Icon as={TrashIcon} size="sm" mr="$2" />
                    <MenuItemLabel size="sm">Delete</MenuItemLabel>
                  </MenuItem>
                </Menu>
              </Block>
            </Block>
          </Block>
        ))}

        <Button
          onPress={() => setShowModal(true)}
          marginVertical={sizes.s}
          width={'30%'}
          variant="outline"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}>
          <ButtonText>Add note </ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      </Block>
    </ScrollView>
  );
}
