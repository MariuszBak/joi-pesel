# joi-pesel
#### PESEL validation rule for Joi
## Installation
`npm install joi-pesel`
## How to use
```typescript
import Joi from '@hapi/joi';
import { JoiPesel } from 'joi-pesel';

const peselJoi = Joi.extend(JoiPesel);

peselJoi.string().pesel().validate('12345678901');
```