export const random = (num) => Math.ceil(Math.random() * num);

export const countClick = (limit = 6, btnName = 'Кнопка') => {
  let count = 0;

  return () => {
    count++;
    const remaining = limit - count;
    
    console.log(`[${btnName}] Натиснуто разів: ${count}, залишилось натискань: ${remaining}`);

    if (count >= limit) {
      console.log(`[${btnName}] Ліміт натискань (${limit}) вичерпано!`);
      return false;
    }

    return true;
  };
};