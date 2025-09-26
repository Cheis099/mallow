const users = [
    { id: 1, email: 'admin@mallow.com', password: '123456', name: 'Админ' },
    { id: 2, email: 'user@mallow.com', password: 'password', name: 'Покупатель' }
  ];

  const products = [
    { 
      id: 1, 
      name: 'Кружка "Тедди"',
      price: 3200, 
      image: 'https://bfdsyleyhyeuvxkzrlck.supabase.co/storage/v1/object/public/mallow/cup4.jpg',
      description: 'Каждый квадратик этой уютной кружки расписан вручную, а милый мишка в центре добавляет ей тепла и очарования.',
      details: {
          material: 'Керамика, пищевая глазурь',
          volume: '~380 мл',
          care: 'Можно мыть в посудомоечной машине, но ручная мойка продлит жизнь рисунку.'
      }
    },
    { 
      id: 2, 
      name: 'Кружка "Розовые банты"',
      price: 3100, 
      image: 'https://bfdsyleyhyeuvxkzrlck.supabase.co/storage/v1/object/public/mallow/cup1.jpg',
      description: 'Эта кружка с узором из розовых лент и мишкой создана для самых романтичных натур и идеально подходит для утреннего кофе в постели.',
      details: {
          material: 'Полуфарфор, пищевая глазурь',
          volume: '~280 мл',
          care: 'Рекомендуется ручная мойка для сохранения нежного рисунка.'
      }
    },
    { 
      id: 3, 
      name: 'Чашка с блюдцем "Пудель"',
      price: 5100, 
      image: 'https://bfdsyleyhyeuvxkzrlck.supabase.co/storage/v1/object/public/mallow/cup2.jpg',
      description: 'Элегантная чайная пара, которая добавит шарма вашим чаепитиям. Очаровательный пудель и нежные сердечки создают атмосферу парижского кафе.',
      details: {
          material: 'Фарфор, пищевая глазурь',
          volume: '~300 мл',
          care: 'Можно использовать в посудомоечной машине.'
      }
    },
    { 
      id: 4, 
      name: 'Кружка "Котик в рамке"',
      price: 4500, 
      image: 'https://bfdsyleyhyeuvxkzrlck.supabase.co/storage/v1/object/public/mallow/cup3.jpg',
      description: 'Изящная кружка с золотыми деталями для самых особенных моментов. Каждый котик нарисован вручную, поэтому двух одинаковых просто не существует!',
      details: {
          material: 'Полуфарфор, пищевая глазурь, золото',
          volume: '~350 мл',
          care: 'Ручная мойка. Не использовать в микроволновой печи из-за золотых элементов.'
      }
    },
    { 
      id: 5, 
      name: 'Кружка с тарелкой "Мишка"',
      price: 3500, 
      image: 'https://bfdsyleyhyeuvxkzrlck.supabase.co/storage/v1/object/public/mallow/cupplate.jpg',
      description: 'Идеальный набор, который будет радовать вас каждое утро. Объемный мишка на кружке и тарелочка в форме тоста сделают ваш завтрак по-настоящему уютным.',
      details: {
          material: 'Керамика, пищевая глазурь',
          volume: 'Кружка ~320 мл',
          care: 'Можно мыть в посудомоечной машине.'
      }
    },
    { 
      id: 6, 
      name: 'Кружки "Котики"',
      price: 5800, 
      image: 'https://bfdsyleyhyeuvxkzrlck.supabase.co/storage/v1/object/public/mallow/doublecup.jpg',
      description: 'Парные кружки для тебя и твоего близкого человека. Созданы, чтобы делить вместе теплые моменты.',
      details: {
          material: 'Керамика, пищевая глазурь',
          volume: 'каждая ~350 мл',
          care: 'Рекомендуется ручная мойка, чтобы сохранить яркость рисунка.'
      }
    },
    { 
      id: 7, 
      name: 'Миска "Клетка и сердца"',
      price: 2900, 
      image: 'https://bfdsyleyhyeuvxkzrlck.supabase.co/storage/v1/object/public/mallow/tridish.jpg',
      description: 'Универсальная мисочка. Нежная розовая клетка и маленькие алые сердечки добавят уюта любому блюду.',
      details: {
          material: 'Керамика, пищевая глазурь',
          dimensions: 'Диаметр ~15 см, высота ~6 см',
          care: 'Можно мыть в посудомоечной машине и использовать в микроволновой печи.'
      }
    },
    { 
      id: 8, 
      name: 'Тарелка "Тюльпаны"',
      price: 2800, 
      image: 'https://bfdsyleyhyeuvxkzrlck.supabase.co/storage/v1/object/public/mallow/twodish.jpg',
      description: 'Изящная тарелка с волнистым краем. Простой и нежный узор с тюльпанами идеально подойдет для десертов или закусок.',
      details: {
          material: 'Полуфарфор, пищевая глазурь',
          dimensions: 'Диаметр ~20 см',
          care: 'Рекомендуется ручная мойка для сохранения рисунка.'
      }
    }
  ];

  export { users, products };