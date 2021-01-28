# joi-pesel
#### PESEL validation rule for Joi
## Installation
`npm install joi-pesel`
## How to use
```typescript
import Joi from 'joi';
import JoiPesel from 'joi-pesel';

const joiPesel = Joi.extend(JoiPesel);

joiPesel.string().pesel().validate('12345678901');
```