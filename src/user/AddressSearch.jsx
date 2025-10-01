import { useState, useRef } from "react";

const AddressSearch = ({ form, setForm, subAddressRef }) => {
const handleAddressSearch = () => {
if (typeof window.daum === "undefined") {
    alert("카카오 주소 검색 스크립트가 로드되지 않았습니다.");
    return;
}

new window.daum.Postcode({
    oncomplete: function (data) {
    const fullAddress = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

    // **수정된 부분**
    // `fullAddress` 변수의 값을 `userAddress`에 할당합니다.
    setForm((prev) => ({
        ...prev,
        userAddress: fullAddress,
        userSubaddress: "", 
    }));

    if (subAddressRef.current) {
        subAddressRef.current.focus();
    }
    },
}).open();
};

return (
<button className="btn-address-search" type="button" onClick={handleAddressSearch}>
    주소검색
</button>
);
};

export default AddressSearch;