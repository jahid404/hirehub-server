import app from './app';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 HireHub Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

bootstrap();