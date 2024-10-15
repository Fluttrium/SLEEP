"use server"
const VerificationUserTemplate: React.FC<{ token: string }> = ({ token }) => {
    return (
        <div>
            <h1>Подтверждение регистрации</h1>
            <div>Ваш код подтверждения: {token}</div>
        </div>
    );
};

export default VerificationUserTemplate;
