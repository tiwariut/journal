import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_POST,
  FILTER_POSTS,
  CLEAR_FILTER
} from '../types';

const PostState = (props) => {
  const initialState = {
    posts: [
      {
        _id: '607c096f3468a95b1f44e6d9',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor fermentum placerat. Ut dapibus eros id leo condimentum, aliquam accumsan massa porttitor.',
        image:
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
        type: 'public',
        status: 'active',
        title: 'The Event Loop',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor fermentum placerat. Ut dapibus eros id leo condimentum, aliquam accumsan massa porttitor. Suspendisse at nunc sit amet dui semper congue. Nullam nec rutrum risus. Nulla facilisi. Nam sollicitudin id quam id eleifend. Sed vel magna nunc. Maecenas justo eros, porta nec ante et, viverra efficitur nisi. Etiam varius est vitae nisl consectetur vulputate. Quisque massa nibh, pharetra a odio id, tristique rhoncus turpis. Aenean sodales odio non ex aliquet rutrum. Cras convallis ultrices egestas. Suspendisse fermentum elementum velit in dictum. Duis mattis, ligula suscipit posuere viverra, justo purus fermentum justo, aliquet sodales ex justo gravida ex. Mauris sed mi euismod, vestibulum risus vitae, euismod ipsum. Nunc ac odio semper, consequat libero sed, auctor ligula. Nulla nec sem sed arcu congue accumsan. Vivamus pulvinar metus nec consectetur commodo. Etiam eget elementum dolor, in convallis felis. Pellentesque quis orci facilisis, venenatis tortor in, fringilla metus. Etiam quis lacus vitae tellus tincidunt ultrices ac id nisl. Cras vitae porttitor tellus. Nam non mauris dapibus, luctus tellus quis, hendrerit mi. Duis condimentum ipsum nibh, ac euismod turpis varius ac. Pellentesque luctus metus ac risus luctus fringilla. Maecenas eu venenatis magna. Etiam non leo porttitor, pretium nunc eget, sagittis augue. Vestibulum vestibulum lobortis ipsum, in venenatis est pulvinar non. Vivamus tincidunt nec diam a tincidunt. Quisque lobortis dignissim velit sit amet sodales. Integer ultricies accumsan laoreet. Maecenas quis ligula sed massa maximus finibus eget ac neque. Integer varius, lacus quis pellentesque faucibus, ligula nulla consectetur lorem, eu hendrerit augue leo a turpis. Donec volutpat lorem sit amet felis cursus sodales. Duis quis sagittis nisi. Aliquam quis sem eu nisl pulvinar euismod vel id sapien. Donec ut libero eu mi blandit tincidunt. Etiam euismod, est quis feugiat accumsan, lacus velit imperdiet mauris, et lacinia risus erat quis risus. Praesent viverra metus lacinia euismod imperdiet. Mauris faucibus in velit vitae pharetra. Phasellus lobortis, urna eget eleifend convallis, tortor arcu laoreet metus, sed porta orci est eget nibh. Nam sed nunc tortor. Phasellus aliquet rhoncus purus, non consectetur diam volutpat eu. Cras in sem dapibus, finibus leo vel, tincidunt velit. Nam vel felis massa. Morbi nunc justo, suscipit eget vehicula non, porttitor ac dui. Sed mollis tincidunt tempor.',
        user: '5d7a514b5d2c12c7449be042',
        category: '607bfad703e7fc462337f701',
        subcategory: '607c096f3468a95b1f44e6d9',
        createdAt: '2021-04-20T12:51:45.893Z',
        updatedAt: '2021-04-20T12:51:45.893Z',
        __v: 0
      },
      {
        _id: '607c09763468a95b1f44e6da',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor fermentum placerat. Ut dapibus eros id leo condimentum, aliquam accumsan massa porttitor.',
        image:
          'https://images.unsplash.com/photo-1572357176061-7c96fd2af22f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80',
        type: 'public',
        status: 'active',
        title: 'The Vegan Diet',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor fermentum placerat. Ut dapibus eros id leo condimentum, aliquam accumsan massa porttitor. Suspendisse at nunc sit amet dui semper congue. Nullam nec rutrum risus. Nulla facilisi. Nam sollicitudin id quam id eleifend. Sed vel magna nunc. Maecenas justo eros, porta nec ante et, viverra efficitur nisi. Etiam varius est vitae nisl consectetur vulputate. Quisque massa nibh, pharetra a odio id, tristique rhoncus turpis. Aenean sodales odio non ex aliquet rutrum. Cras convallis ultrices egestas. Suspendisse fermentum elementum velit in dictum. Duis mattis, ligula suscipit posuere viverra, justo purus fermentum justo, aliquet sodales ex justo gravida ex. Mauris sed mi euismod, vestibulum risus vitae, euismod ipsum. Nunc ac odio semper, consequat libero sed, auctor ligula. Nulla nec sem sed arcu congue accumsan. Vivamus pulvinar metus nec consectetur commodo. Etiam eget elementum dolor, in convallis felis. Pellentesque quis orci facilisis, venenatis tortor in, fringilla metus. Etiam quis lacus vitae tellus tincidunt ultrices ac id nisl. Cras vitae porttitor tellus. Nam non mauris dapibus, luctus tellus quis, hendrerit mi. Duis condimentum ipsum nibh, ac euismod turpis varius ac. Pellentesque luctus metus ac risus luctus fringilla. Maecenas eu venenatis magna. Etiam non leo porttitor, pretium nunc eget, sagittis augue. Vestibulum vestibulum lobortis ipsum, in venenatis est pulvinar non. Vivamus tincidunt nec diam a tincidunt. Quisque lobortis dignissim velit sit amet sodales. Integer ultricies accumsan laoreet. Maecenas quis ligula sed massa maximus finibus eget ac neque. Integer varius, lacus quis pellentesque faucibus, ligula nulla consectetur lorem, eu hendrerit augue leo a turpis. Donec volutpat lorem sit amet felis cursus sodales. Duis quis sagittis nisi. Aliquam quis sem eu nisl pulvinar euismod vel id sapien. Donec ut libero eu mi blandit tincidunt. Etiam euismod, est quis feugiat accumsan, lacus velit imperdiet mauris, et lacinia risus erat quis risus. Praesent viverra metus lacinia euismod imperdiet. Mauris faucibus in velit vitae pharetra. Phasellus lobortis, urna eget eleifend convallis, tortor arcu laoreet metus, sed porta orci est eget nibh. Nam sed nunc tortor. Phasellus aliquet rhoncus purus, non consectetur diam volutpat eu. Cras in sem dapibus, finibus leo vel, tincidunt velit. Nam vel felis massa. Morbi nunc justo, suscipit eget vehicula non, porttitor ac dui. Sed mollis tincidunt tempor.',
        user: '607b21b00732661a8adc4803',
        category: '607bfaee03e7fc462337f702',
        subcategory: '607c09763468a95b1f44e6da',
        createdAt: '2021-04-20T12:51:45.893Z',
        updatedAt: '2021-04-20T12:51:45.893Z',
        __v: 0
      },
      {
        _id: '607c097b3468a95b1f44e6db',
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor fermentum placerat. Ut dapibus eros id leo condimentum, aliquam accumsan massa porttitor.',
        image:
          'https://images.unsplash.com/photo-1603350005732-7de3b2d6ecad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80',
        type: 'public',
        status: 'active',
        title: 'Khardung La',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor fermentum placerat. Ut dapibus eros id leo condimentum, aliquam accumsan massa porttitor. Suspendisse at nunc sit amet dui semper congue. Nullam nec rutrum risus. Nulla facilisi. Nam sollicitudin id quam id eleifend. Sed vel magna nunc. Maecenas justo eros, porta nec ante et, viverra efficitur nisi. Etiam varius est vitae nisl consectetur vulputate. Quisque massa nibh, pharetra a odio id, tristique rhoncus turpis. Aenean sodales odio non ex aliquet rutrum. Cras convallis ultrices egestas. Suspendisse fermentum elementum velit in dictum. Duis mattis, ligula suscipit posuere viverra, justo purus fermentum justo, aliquet sodales ex justo gravida ex. Mauris sed mi euismod, vestibulum risus vitae, euismod ipsum. Nunc ac odio semper, consequat libero sed, auctor ligula. Nulla nec sem sed arcu congue accumsan. Vivamus pulvinar metus nec consectetur commodo. Etiam eget elementum dolor, in convallis felis. Pellentesque quis orci facilisis, venenatis tortor in, fringilla metus. Etiam quis lacus vitae tellus tincidunt ultrices ac id nisl. Cras vitae porttitor tellus. Nam non mauris dapibus, luctus tellus quis, hendrerit mi. Duis condimentum ipsum nibh, ac euismod turpis varius ac. Pellentesque luctus metus ac risus luctus fringilla. Maecenas eu venenatis magna. Etiam non leo porttitor, pretium nunc eget, sagittis augue. Vestibulum vestibulum lobortis ipsum, in venenatis est pulvinar non. Vivamus tincidunt nec diam a tincidunt. Quisque lobortis dignissim velit sit amet sodales. Integer ultricies accumsan laoreet. Maecenas quis ligula sed massa maximus finibus eget ac neque. Integer varius, lacus quis pellentesque faucibus, ligula nulla consectetur lorem, eu hendrerit augue leo a turpis. Donec volutpat lorem sit amet felis cursus sodales. Duis quis sagittis nisi. Aliquam quis sem eu nisl pulvinar euismod vel id sapien. Donec ut libero eu mi blandit tincidunt. Etiam euismod, est quis feugiat accumsan, lacus velit imperdiet mauris, et lacinia risus erat quis risus. Praesent viverra metus lacinia euismod imperdiet. Mauris faucibus in velit vitae pharetra. Phasellus lobortis, urna eget eleifend convallis, tortor arcu laoreet metus, sed porta orci est eget nibh. Nam sed nunc tortor. Phasellus aliquet rhoncus purus, non consectetur diam volutpat eu. Cras in sem dapibus, finibus leo vel, tincidunt velit. Nam vel felis massa. Morbi nunc justo, suscipit eget vehicula non, porttitor ac dui. Sed mollis tincidunt tempor.',
        user: '607b21b00732661a8adc4804',
        category: '607bfafb03e7fc462337f703',
        subcategory: '607c097b3468a95b1f44e6db',
        createdAt: '2021-04-20T12:51:45.893Z',
        updatedAt: '2021-04-20T12:51:45.893Z',
        __v: 0
      }
    ]
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Add Post

  // Delete Post

  // Set Current Post

  // Clear Current Post

  // Update Post

  // Filter Post

  // Clear Filter

  return (
    <PostContext.Provider
      value={{
        posts: state.posts
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
