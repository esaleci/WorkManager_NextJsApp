

export function saveImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const base64String = event.target?.result as string;
          const images = JSON.parse(localStorage.getItem('images') || '[]');
          const newImage = {
            id: Date.now().toString(),
            data: base64String,
            name: file.name,
            type: file.type,
            size: file.size,
            createdAt: new Date().toISOString()
          };
          
          images.push(newImage);
          localStorage.setItem('images', JSON.stringify(images));
          resolve(newImage.id);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
  
  export function getImage(id: string): string | null {
    try {
      const images = JSON.parse(localStorage.getItem('images') || '[]');
      const image = images.find((img: any) => img.id === id);
      return image ? image.data : null;
    } catch {
      return null;
    }
  }
  
  export function getAllImages(): Array<{ id: string; name: string; createdAt: string }> {
    try {
      const images = JSON.parse(localStorage.getItem('images') || '[]');
      return images.map((img: any) => ({
        id: img.id,
        name: img.name,
        createdAt: img.createdAt
      }));
    } catch {
      return [];
    }
  }
  
  export function deleteImage(id: string): boolean {
    try {
      const images = JSON.parse(localStorage.getItem('images') || '[]');
      const filteredImages = images.filter((img: any) => img.id !== id);
      localStorage.setItem('images', JSON.stringify(filteredImages));
      return true;
    } catch {
      return false;
    }
  }