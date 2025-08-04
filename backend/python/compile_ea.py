"""
MQL5 EA Compilation Service
Handles compilation of MQL5 Expert Advisors with license injection
"""

import sys
import os
import subprocess
import json
import time
from pathlib import Path

class MQL5Compiler:
    def __init__(self):
        self.compiler_path = os.environ.get('MQL5_COMPILER_PATH', '')
        self.ea_storage = os.environ.get('EA_STORAGE_PATH', './uploads/ea_files')
        self.compiled_path = os.environ.get('COMPILED_EA_PATH', './uploads/compiled')
        
    def compile_ea(self, source_file, product_id, license_key=None):
        """
        Compile MQL5 EA with optional license injection
        """
        try:
            # Prepare paths
            source_path = Path(source_file)
            if not source_path.exists():
                raise FileNotFoundError(f"Source file not found: {source_file}")
            
            # Create output directory
            compiled_dir = Path(self.compiled_path)
            compiled_dir.mkdir(parents=True, exist_ok=True)
            
            # Generate output filename
            output_name = f"{source_path.stem}_{product_id}.ex5"
            output_path = compiled_dir / output_name
            
            # Inject license if provided
            if license_key:
                modified_source = self.inject_license(source_path, license_key)
                compile_source = modified_source
            else:
                compile_source = source_path
            
            # Run compilation
            cmd = [self.compiler_path, '/compile', str(compile_source)]
            
            print(f"🔧 Compiling: {compile_source}")
            print(f"📍 Command: {' '.join(cmd)}")
            
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=60  # 60 second timeout
            )
            
            if result.returncode == 0:
                # Move compiled file to target location
                temp_compiled = compile_source.parent / f"{compile_source.stem}.ex5"
                if temp_compiled.exists():
                    temp_compiled.rename(output_path)
                    
                    return {
                        'success': True,
                        'compiled_path': str(output_path),
                        'filename': output_name,
                        'message': 'Compilation successful'
                    }
                else:
                    raise Exception("Compiled file not found after successful compilation")
            else:
                raise Exception(f"Compilation failed: {result.stderr}")
                
        except subprocess.TimeoutExpired:
            return {
                'success': False,
                'error': 'Compilation timeout (60 seconds exceeded)',
                'message': 'Compilation process took too long'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'message': 'Compilation failed'
            }
    
    def inject_license(self, source_path, license_key):
        """
        Inject license key into MQL5 source code
        """
        try:
            # Read source file
            with open(source_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Inject license key
            license_code = f'''
// Auto-generated license verification
string LICENSE_KEY = "{license_key}";
bool VerifyLicense() {{
    // Add your license verification logic here
    return true;
}}
'''
            
            # Find insertion point (after includes)
            lines = content.split('\n')
            insert_index = 0
            
            for i, line in enumerate(lines):
                if line.strip().startswith('#include') or line.strip().startswith('#property'):
                    insert_index = i + 1
                elif line.strip() and not line.strip().startswith('//'):
                    break
            
            # Insert license code
            lines.insert(insert_index, license_code)
            
            # Write modified file
            modified_path = source_path.parent / f"licensed_{source_path.name}"
            with open(modified_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(lines))
            
            return modified_path
            
        except Exception as e:
            print(f"❌ License injection failed: {e}")
            return source_path  # Return original if injection fails

def main():
    """
    Main function for command-line usage
    """
    if len(sys.argv) < 3:
        print("Usage: python compile_ea.py <source_file> <product_id> [license_key]")
        sys.exit(1)
    
    source_file = sys.argv[1]
    product_id = sys.argv[2]
    license_key = sys.argv[3] if len(sys.argv) > 3 else None
    
    compiler = MQL5Compiler()
    result = compiler.compile_ea(source_file, product_id, license_key)
    
    # Output result as JSON for Node.js consumption
    print(json.dumps(result, indent=2))
    
    if result['success']:
        sys.exit(0)
    else:
        sys.exit(1)

if __name__ == "__main__":
    main()
