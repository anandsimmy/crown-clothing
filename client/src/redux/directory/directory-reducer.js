const INITIAL_STATE=  {
    sections: [
    {
      title: 'jackets',
      imageUrl: 'https://i.ibb.co/M6hHc3F/brown-trench.png',
      id: 2,
      linkUrl: 'shop/jackets'
    },
    {
      title: 'sneakers',
      imageUrl: 'https://i.ibb.co/QcvzydB/nikes-red.png',
      id: 3,
      linkUrl: 'shop/sneakers'
    },
    {
      title: 'hats',
      imageUrl: 'https://i.ibb.co/X2VJP2W/blue-snapback.png',
      id: 1,
      linkUrl: 'shop/hats'
    },
    {
      title: 'mens',
      imageUrl: 'https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png',
      size: 'large',
      id: 5,
      linkUrl: 'shop/mens'
    },
    {
      title: 'womens',
      imageUrl: 'https://i.ibb.co/KmSkMbH/striped-sweater.png',
      size: 'large',
      id: 4,
      linkUrl: 'shop/womens'
    }  
  ]
}

const directoryReducer= (state= INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state;
    }
}

export default directoryReducer