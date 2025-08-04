const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class CompilerService {
  constructor() {
    this.compilerPath = process.env.MQL5_COMPILER_PATH;
    this.eaStoragePath = path.resolve(process.env.EA_STORAGE_PATH || './uploads/ea_files');
    this.compiledPath = path.resolve(process.env.COMPILED_EA_PATH || './uploads/compiled');
    
    // Ensure directories exist
    try {
      fs.ensureDirSync(this.eaStoragePath);
      fs.ensureDirSync(this.compiledPath);
    } catch (error) {
      console.error('Error creating directories:', error.message);
    }
  }

  async compileEA(sourceFilePath, productId) {
    return new Promise((resolve, reject) => {
      try {
        const fileName = path.basename(sourceFilePath, '.mq5');
        const compiledFileName = `${fileName}_${productId}.ex5`;
        const compiledFilePath = path.join(this.compiledPath, compiledFileName);

        // Copy source file to temp location for compilation
        const tempDir = path.join(this.eaStoragePath, 'temp');
        fs.ensureDirSync(tempDir);
        const tempSourcePath = path.join(tempDir, `${fileName}.mq5`);
        fs.copyFileSync(sourceFilePath, tempSourcePath);

        // Compile command
        const compileArgs = ['/compile', tempSourcePath];
        
        console.log(`🔧 Compiling EA: ${fileName}`);
        console.log(`📍 Command: ${this.compilerPath} ${compileArgs.join(' ')}`);

        const compiler = spawn(this.compilerPath, compileArgs);

        let stderr = '';
        
        compiler.stderr.on('data', (data) => {
          stderr += data.toString();
        });

        compiler.on('close', (code) => {
          try {
            // Clean up temp source file
            fs.removeSync(tempSourcePath);

            if (code === 0) {
              // Compilation successful
              const tempCompiledPath = path.join(tempDir, `${fileName}.ex5`);
              
              if (fs.existsSync(tempCompiledPath)) {
                // Move compiled file to final location
                fs.moveSync(tempCompiledPath, compiledFilePath);
                
                console.log(`✅ Compilation successful: ${compiledFileName}`);
                resolve({
                  success: true,
                  compiledPath: compiledFilePath,
                  fileName: compiledFileName
                });
              } else {
                reject(new Error('Compiled file not found after successful compilation'));
              }
            } else {
              console.error(`❌ Compilation failed with code ${code}`);
              console.error(`Error output: ${stderr}`);
              reject(new Error(`Compilation failed: ${stderr}`));
            }
          } catch (error) {
            reject(new Error(`Post-compilation error: ${error.message}`));
          }
        });

        compiler.on('error', (error) => {
          reject(new Error(`Compiler process error: ${error.message}`));
        });

      } catch (error) {
        reject(new Error(`Compilation setup error: ${error.message}`));
      }
    });
  }

  async generateLicenseKey(userId, productId) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const licenseKey = `EA-${userId.substring(0, 8)}-${productId.substring(0, 8)}-${random}-${timestamp.toString(36).toUpperCase()}`;
    return licenseKey;
  }

  async injectLicense(compiledFilePath, licenseKey) {
    // This would be implemented based on your specific license injection method
    // For now, we'll just return the file path
    console.log(`🔐 License injected: ${licenseKey}`);
    return compiledFilePath;
  }
}

module.exports = new CompilerService();
