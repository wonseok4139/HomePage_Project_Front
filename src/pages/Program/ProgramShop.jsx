import React, { useState } from 'react';

const ProgramShop = () => {
  // 1. 상품 목록을 담을 배열 상태
  const [items, setItems] = useState([]);
  
  // 2. 입력창의 값을 담을 상태
  const [inputValue, setInputValue] = useState('');

  // 상품 추가 함수: 버튼 클릭 또는 엔터 키 입력 시 호출
  const handleAddItem = () => {
    // 입력값이 비어있으면 함수를 종료합니다.
    if (inputValue.trim() === '') {
      return;
    }
    
    // 새로운 상품 객체를 만듭니다.
    const newItem = {
      id: Date.now(), // 고유한 ID 생성 (실무에서는 더 안전한 방법을 사용합니다)
      name: inputValue,
    };
    
    // 기존 배열에 새 상품을 추가하여 새로운 배열로 상태를 업데이트합니다.
    setItems([...items, newItem]);
    // 입력창을 비워줍니다.
    setInputValue('');
  };

  // 상품 삭제 함수
  const handleRemoveItem = (idToRemove) => {
    // 삭제하려는 id와 일치하지 않는 상품들만 남겨서 새로운 배열을 만듭니다.
    const nextItems = items.filter(item => item.id !== idToRemove);
    setItems(nextItems);
  };
  
  // 엔터 키 입력 시 상품을 추가하는 함수
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>나의 쇼핑 목록</h1>
      <div>
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터 키 이벤트 핸들러 추가
          placeholder='상품명을 입력하세요...'
        />
        <button onClick={handleAddItem}>추가</button>
      </div>

      <ul>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item.name}
            <button onClick={() => handleRemoveItem(item.id)} style={{ marginLeft: '10px' }}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramShop;